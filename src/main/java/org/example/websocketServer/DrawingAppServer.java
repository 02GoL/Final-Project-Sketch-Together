package org.example.websocketServer;


import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static org.example.util.DrawingAPIHandler.saveDrawingHistory;
import static org.example.util.DrawingAPIHandler.loadDrawingHistory;


/**
 * This class represents a web socket server, a new connection is created and it receives a roomID as a parameter
 * **/
@ServerEndpoint(value="/ws/{roomID}")
public class DrawingAppServer {

    // contains a static List of ChatRoom used to control the existing rooms and their users
    private static ArrayList<RoomData> roomList = new ArrayList<>();
    // you may add other attributes as you see fit
    private static Map<String, String> roomHistoryList = new HashMap<String, String>();

    @OnOpen
    public void open(@PathParam("roomID") String roomID, Session session) throws IOException, EncodeException {
        String userID = session.getId();
        boolean roomExist = false;

        for(RoomData room: roomList){
            if(roomID.equals(room.getCode())){
                room.addUser(userID);
                roomExist = true;
                // loading the chat history
                String history = loadDrawingHistory(roomID);
                session.getBasicRemote().sendText(history);
                break;
            }
        }
        if(!roomExist){
            roomList.add(new RoomData(roomID,userID));
        }


    }

    @OnClose
    public void close(Session session) throws IOException, EncodeException {
        String userId = session.getId();
        for(RoomData room: roomList){
            if(room.inRoom(userId)){
                //String roomID = room.getCode();
                room.removeUser(userId);
                break;
            }
        }
    }

    @OnMessage
    public void handleMessage(String comm, Session session) throws IOException, EncodeException {
        String userID = session.getId();
        JSONObject jsonMsg = new JSONObject(comm);
        String roomID = ((String) jsonMsg.get("roomID")).substring(0,5);
        String encodedData = (String) jsonMsg.get("encodedData");

        for(RoomData room: roomList) {
            if (roomID.equals(room.getCode())) {
                for (Session peer : session.getOpenSessions()) {
                    if (room.inRoom(peer.getId())) {
                        if (!(peer.getId().equals(userID))) {
                            // message will appear for those who entered the room and have a username inputted
                            peer.getBasicRemote().sendText("{\"encodedData\":\"" + encodedData + "\"}");
                        }
                    }
                }
                saveDrawingHistory(roomID,encodedData);
                break;
            }
        }
    }
}