package com.example.game2048.model;

import java.util.Arrays;
import java.util.List;

public class GameState {
    private final int size;
    private final int[][] board;
    private final long score;
    private final boolean won;
    private final boolean over;
    private final List<int[]> newTiles;

    public GameState(int size) {
        this.size = size;
        this.board = new int[size][size];
        this.score = 0;
        this.won = false;
        this.over = false;
        this.newTiles = List.of();
    }

    public GameState(int[][] board, long score, boolean won, boolean over, List<int[]> newTiles) {
        this.size = board.length;
        this.board = board;
        this.score = score;
        this.won = won;
        this.over = over;
        this.newTiles = newTiles;
    }

    public int getSize() { return size; }
    public int[][] getBoard() { return board; }
    public long getScore() { return score; }
    public boolean isWon() { return won; }
    public boolean isOver() { return over; }
    public List<int[]> getNewTiles() { return newTiles; }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        for (int[] row : board) sb.append(Arrays.toString(row)).append('\n');
        sb.append("score=" + score);
        return sb.toString();
    }
}
