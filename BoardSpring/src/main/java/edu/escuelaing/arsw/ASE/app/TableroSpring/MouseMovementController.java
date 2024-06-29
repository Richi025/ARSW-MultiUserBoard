package edu.escuelaing.arsw.ASE.app.TableroSpring;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


import java.util.ArrayList;
import java.util.List;


/**
 * REST controller for handling mouse movement data.
 */
@CrossOrigin(origins = "*")
@RestController
public class MouseMovementController {

    private List<MouseMovement> movements = new ArrayList<>();


    /**
     * POST endpoint to add a new mouse movement object to the list.
     *
     * @param movement MouseMovement object received in the request body.
     */
    @PostMapping("/mouse-movements")
    public void addMovement(@RequestBody MouseMovement movement) {
        movements.add(movement);
        System.out.println(String.format("Movimiento recibido - X: %f, Y: %f, Timestamp: %d", movement.getX(), movement.getY(), movement.getTimestamp()));
    }

    /**
     * GET endpoint to retrieve all recorded mouse movements.
     *
     * @return List of MouseMovement objects containing all recorded movements.
     */
    @GetMapping("/mouse-movements")
    public List<MouseMovement> getMovements() {
        return new ArrayList<>(movements);
    }

    /**
     * POST endpoint to clear all recorded mouse movements.
     */
    @PostMapping("/clear")
    public void clearActions() {
        movements.clear();
    }

}
