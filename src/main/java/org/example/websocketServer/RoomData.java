package org.example.websocketServer;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class RoomData {
    private String code;

    //each user has an unique ID associate to their ws session and their username
    private Set<String> users = new HashSet<String>();

    // when created the chat room has at least one user
    public RoomData(String code, String user){
        this.code = code;
        // when created the user has not entered their username yet
        this.users.add(user);
    }
    public void setCode(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
    public void addUser(String userID){
        this.users.add(userID);
    }
    /**
     * This method will remove a user from this room
     * **/
    public void removeUser(String userID){
        if(users.contains(userID)){
            users.remove(userID);
        }
    }

    public boolean inRoom(String userID){
        return users.contains(userID);
    }
}
