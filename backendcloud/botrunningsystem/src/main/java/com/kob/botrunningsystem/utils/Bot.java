package com.kob.botrunningsystem.utils;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.*;

public class Bot implements com.kob.botrunningsystem.utils.BotInterface {
    public static int INT = 0x3f3f3f3f;
    public static int[][] g = new int[13][14];
    public static int[][] path = new int[13][14];
    public static int[] dx = {-1, 0, 1, 0};
    public static int[] dy = {0, 1, 0, -1};


    static class Cell {//蛇身体（单格）
        public int x, y;
        public Cell(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    private boolean check_tail_increasing(int step) {//检查蛇什么时候会变长
        if (step <= 10) return true;
        return step % 3 == 1;
    }

    public List<Cell> getCells(int sx, int sy, String steps) {//获取游戏中两条蛇的身体位置
        steps = steps.substring(1, steps.length() - 1);
        List<Cell> res = new ArrayList<>();

        int[] dx = {-1, 0, 1, 0}, dy = {0, 1, 0, -1};
        int x = sx, y = sy;
        int step = 0;
        res.add(new Cell(x, y));
        for (int i = 0; i < steps.length(); i++) {
            int d = steps.charAt(i) - '0';
            x += dx[d];
            y += dy[d];
            res.add(new Cell(x, y));
            if (!check_tail_increasing(++step)) {
                res.remove(0);
            }
        }
        return res;
    }

    //读取数据
    public void get() {
        File file = new File("input.txt");
        try {
            Scanner scanner = new Scanner(file);
            System.out.println(nextMove(scanner.next()));
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public Integer nextMove(String input) {
        String[] strs = input.split("#");
        for (int i = 0, k = 0; i < 13; i++) {
            for (int j = 0; j < 14; j++, k++) {
                if (strs[0].charAt(k) == '1') {//找到地图中所有的墙
                    g[i][j] = 1;//1：障碍物，0：空地
                }
            }
        }
        for (int i = 0, k = 0; i < 13; i++) {
            for (int j = 0; j < 14; j++, k++) {
                path[i][j] = -1;
            }
        }

        int aSx = Integer.parseInt(strs[1]), aSy = Integer.parseInt(strs[2]);
        int bSx = Integer.parseInt(strs[4]), bSy = Integer.parseInt(strs[5]);

        List<Cell> aCells = getCells(aSx, aSy, strs[3]);
        List<Cell> bCells = getCells(bSx, bSy, strs[6]);

        for (Cell c : aCells) g[c.x][c.y] = 1;//将地图中两条蛇身体的位置标记成障碍物
        for (Cell c : bCells) g[c.x][c.y] = 1;
        //        打印地图
        //        printMap();

        //        a蛇头坐标
        int aHeadX = aCells.get(aCells.size() - 1).x;
        int aHeadY = aCells.get(aCells.size() - 1).y;

        int d = bfs(aHeadX, aHeadY);

        return d;
    }

    //递归寻找路径
    public static int bfs(int sx, int sy) {
        if (sx<0 || sx>=13 || sy<0 || sy>=14 || g[sx][sy]==1) {
            return 0;
        }
        int d = 0;
        Queue<Cell> q = new LinkedList<>();
        q.add(new Cell(sx, sy));
        while(q.isEmpty()) {
            Cell cell = q.remove();
            for(int i = 0; i < 4; ++i) {
                int x = cell.x + dx[i];
                int y = cell.y + dy[i];
                if (x<0 || x>=13 || y<0 || y>=14 || g[x][y]==1)
                    continue;
                g[x][y] = 1;
                q.add(new Cell(x, y));
            }
        }
        return d;
    }
}
