package org.example.websocketServer;

import jakarta.servlet.annotation.*;
import jakarta.servlet.http.*;
import org.apache.commons.lang3.RandomStringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashSet;
import java.util.Set;

/**
 * This is a class that has services
 * In our case, we are using this to generate unique room IDs**/
@WebServlet(name = "RoomServlet", value = "/room-servlet")
public class RoomServlet extends HttpServlet {
    private String message;

    //static so this set is unique
    public static Set<String> rooms = new HashSet<>();


    /**
     * Method generates unique room codes
     * **/
    public String generatingRandomUpperAlphanumericString(int length) {
        String generatedString = RandomStringUtils.randomAlphanumeric(length).toUpperCase();
        // generating unique room code
        while (rooms.contains(generatedString)){
            generatedString = RandomStringUtils.randomAlphanumeric(length).toUpperCase();
        }
        rooms.add(generatedString);

        return generatedString;
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("text/plain");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:63342");
        // send the random code as the response's content
        PrintWriter out = response.getWriter();
        out.println(generatingRandomUpperAlphanumericString(5));
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:63342");
        // send the random code as the response's content

        JSONObject roomJson = new JSONObject();
        JSONArray roomList = new JSONArray();
        for (String room : rooms) {
            roomList.put(room);
        }
        roomJson.put("rooms",roomList);
        response.getWriter().println(roomJson); // upon request, the set of all the rooms will be sent to the client
    }

    public void destroy() {
    }
}