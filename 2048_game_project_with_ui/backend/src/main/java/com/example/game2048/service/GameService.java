package com.example.game2048.service;

import com.example.game2048.model.GameState;
import com.example.game2048.util.Direction;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class GameService {
    private final Random rnd = new SecureRandom();

    public GameState newGame(int size) {
        int[][] board = new int[size][size];
        List<int[]> newTiles = new ArrayList<>();
        newTiles.addAll(addRandom(board));
        newTiles.addAll(addRandom(board));
        return new GameState(board, 0, false, false, newTiles);
    }

    public GameState move(GameState state, Direction dir) {
        int n = state.getSize();
        int[][] board = deepCopy(state.getBoard());
        long score = state.getScore();

        boolean moved = false;

        int[][] transformed = transformForDirection(board, dir);
        for (int r = 0; r < n; r++) {
            int[] row = transformed[r];
            MoveResult res = compressAndMergeRow(row);
            if (res.moved) moved = true;
            transformed[r] = res.row;
            score += res.gained;
        }

        int[][] after = inverseTransformForDirection(transformed, dir);

        List<int[]> newTiles = new ArrayList<>();
        if (moved) {
            newTiles.addAll(addRandom(after));
        }

        boolean won = checkWon(after);
        boolean over = !won && !hasMoves(after);

        return new GameState(after, score, won, over, newTiles);
    }

    private int[][] deepCopy(int[][] board) {
        int n = board.length;
        int[][] out = new int[n][n];
        for (int i = 0; i < n; i++) System.arraycopy(board[i], 0, out[i], 0, n);
        return out;
    }

    private static class MoveResult {
        int[] row;
        boolean moved;
        long gained;
        MoveResult(int[] row, boolean moved, long gained) { this.row = row; this.moved = moved; this.gained = gained; }
    }

    private MoveResult compressAndMergeRow(int[] row) {
        int n = row.length;
        List<Integer> nonZero = new ArrayList<>();
        for (int v : row) if (v != 0) nonZero.add(v);
        List<Integer> merged = new ArrayList<>();
        long gained = 0;
        for (int i = 0; i < nonZero.size(); i++) {
            int cur = nonZero.get(i);
            if (i + 1 < nonZero.size() && nonZero.get(i + 1) == cur) {
                int newVal = cur + cur;
                merged.add(newVal);
                gained += newVal;
                i++;
            } else {
                merged.add(cur);
            }
        }
        int[] newRow = new int[n];
        for (int i = 0; i < merged.size(); i++) newRow[i] = merged.get(i);

        boolean moved = false;
        for (int i = 0; i < n; i++) if (row[i] != newRow[i]) { moved = true; break; }
        return new MoveResult(newRow, moved, gained);
    }

    private int[][] transformForDirection(int[][] board, Direction dir) {
        int n = board.length;
        int[][] t = new int[n][n];
        switch (dir) {
            case LEFT:
                for (int i = 0; i < n; i++) System.arraycopy(board[i], 0, t[i], 0, n);
                return t;
            case RIGHT:
                for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) t[i][j] = board[i][n - 1 - j];
                return t;
            case UP:
                for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) t[i][j] = board[j][i];
                return t;
            case DOWN:
                for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) t[i][j] = board[n - 1 - j][i];
                return t;
            default:
                return board;
        }
    }

    private int[][] inverseTransformForDirection(int[][] t, Direction dir) {
        int n = t.length;
        int[][] out = new int[n][n];
        switch (dir) {
            case LEFT:
                for (int i = 0; i < n; i++) System.arraycopy(t[i], 0, out[i], 0, n);
                return out;
            case RIGHT:
                for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) out[i][j] = t[i][n - 1 - j];
                return out;
            case UP:
                for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) out[j][i] = t[i][j];
                return out;
            case DOWN:
                for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) out[n - 1 - j][i] = t[i][j];
                return out;
            default:
                return t;
        }
    }

    private List<int[]> addRandom(int[][] board) {
        List<int[]> empties = new ArrayList<>();
        int n = board.length;
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (board[i][j] == 0) empties.add(new int[]{i,j});
        if (empties.isEmpty()) return List.of();
        int[] pos = empties.get(rnd.nextInt(empties.size()));
        board[pos[0]][pos[1]] = rnd.nextDouble() < 0.9 ? 2 : 4;
        return List.of(pos);
    }

    private boolean checkWon(int[][] board) {
        int n = board.length;
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (board[i][j] == 2048) return true;
        return false;
    }

    private boolean hasMoves(int[][] board) {
        int n = board.length;
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) if (board[i][j] == 0) return true;
        for (int i = 0; i < n; i++) for (int j = 0; j < n; j++) {
            if (i + 1 < n && board[i][j] == board[i+1][j]) return true;
            if (j + 1 < n && board[i][j] == board[i][j+1]) return true;
        }
        return false;
    }
}
