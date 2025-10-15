package com.example.game2048.controller;

import com.example.game2048.model.GameState;
import com.example.game2048.service.GameService;
import com.example.game2048.util.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/game")
@CrossOrigin(origins = "*")
public class GameController {

    private final GameService gameService;
    private GameState current;

    public GameController(GameService gameService) {
        this.gameService = gameService;
    }

    @PostMapping("/new")
    public ResponseEntity<GameState> newGame(@RequestParam(defaultValue = "4") int size) {
        current = gameService.newGame(size);
        return ResponseEntity.ok(current);
    }

    @GetMapping("/state")
    public ResponseEntity<GameState> state() {
        if (current == null) current = gameService.newGame(4);
        return ResponseEntity.ok(current);
    }

    @PostMapping("/move")
    public ResponseEntity<GameState> move(@RequestParam String dir) {
        if (current == null) current = gameService.newGame(4);
        Direction d;
        try {
            d = Direction.valueOf(dir.toUpperCase());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
        current = gameService.move(current, d);
        return ResponseEntity.ok(current);
    }

    @PostMapping("/restart")
    public ResponseEntity<GameState> restart(@RequestParam(defaultValue = "4") int size) {
        current = gameService.newGame(size);
        return ResponseEntity.ok(current);
    }
}
