function randomInteger(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class Cell {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.walls = {
            top: true,
            right: true,
            bottom: true,
            left: true,
        };
        this.visited = false;
        this.random = false;
    }

    draw(ctx, cellWidth) {
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 4;
        ctx.beginPath();

        const px = this.x * cellWidth;
        const py = this.y * cellWidth;



        ctx.fillStyle = this.random ? "DarkOrange" : "DarkSlateGrey";
        ctx.fillRect(px, py, px + cellWidth, py + cellWidth);
        
        console.log("random? ", this.random);
        
        if(this.random && Math.random() < 0.25){
            const spriteNumber = randomInteger(0,4);
            const sprite = new Image();

            if (spriteNumber === 0){
                sprite.src = "sprites/pumpkin.png";
            }else if (spriteNumber === 1){
                sprite.src = "sprites/spider.png";
            }else if (spriteNumber === 2){
                sprite.src = "sprites/web.png";
            }else if (spriteNumber === 3){
                sprite.src = "sprites/witch.png";
            }

            ctx.drawImage(sprite, px, py, cellWidth, cellWidth);
        }

        ctx.moveTo(px, py);

        if (this.walls.left) {
            ctx.lineTo(px, py + cellWidth);
        } else {
            ctx.moveTo(px, py + cellWidth);
        }

        if (this.walls.bottom) {
            ctx.lineTo(px + cellWidth, py + cellWidth);
        } else {
            ctx.moveTo(px + cellWidth, py + cellWidth);
        }

        if (this.walls.right) {
            ctx.lineTo(px + cellWidth, py);
        } else {
            ctx.moveTo(px + cellWidth, py);
        }

        if (this.walls.top) {
            ctx.lineTo(px, py);
        } else {
            ctx.moveTo(px, py);
        }

        ctx.stroke();
    }

    // find naboerne i grid vha. this.x og this.y
    unvisitedNeighbors(grid) {
        let neighbors = [];

        // Vi er ikke den nordligste celle
        if (this.y > 0) {
            const nord_x = this.x;
            const nord_y = this.y - 1;
            const nord_nabo = grid[nord_x][nord_y];
            if (!nord_nabo.visited) {
                neighbors.push(nord_nabo);
            }
        }

        // Vi er ikke cellen mest til venstre
        if (this.x > 0) {
            const venstre_x = this.x - 1;
            const venstre_y = this.y;
            const venstre_nabo = grid[venstre_x][venstre_y];
            if (!venstre_nabo.visited) {
                neighbors.push(venstre_nabo);
            }
        }

        // Vi er ikke den sydligste celle
        if (this.y < grid[0].length - 1) {
            const syd_x = this.x;
            const syd_y = this.y + 1;
            const syd_nabo = grid[syd_x][syd_y];
            if (!syd_nabo.visited) {
                neighbors.push(syd_nabo);
            }
        }

        // Vi er ikke cellen mest til højre
        if (this.x < grid.length - 1) {
            const højre_x = this.x + 1;
            const højre_y = this.y;
            const højre_nabo = grid[højre_x][højre_y];
            if (!højre_nabo.visited) {
                neighbors.push(højre_nabo);
            }
        }

        return neighbors;
    }

    punchWallDown(otherCell) {
        const dx = this.x - otherCell.x;
        const dy = this.y - otherCell.y;

        if (dx === 1) {
            // otherCell er til venstre for this
            this.walls.left = false;
            otherCell.walls.right = false;
        } else if (dx === -1) {
            // otherCell er til højre for this
            this.walls.right = false;
            otherCell.walls.left = false;
        } else if (dy === 1) {
            // otherCell er over this
            this.walls.top = false;
            otherCell.walls.bottom = false;
        } else if (dy === -1) {
            // otherCell er under this
            this.walls.bottom = false;
            otherCell.walls.top = false;
        }
    }
}

class Maze {
    constructor(cols, rows, canvas) {
        this.grid = [];
        this.cols = cols;
        this.rows = rows;
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellWidth = canvas.width / cols;
        this.initializeGrid();
    }

    initializeGrid() {
        for (let i = 0; i < this.rows; i += 1) {
            this.grid.push([]);
            for (let j = 0; j < this.cols; j += 1) {
                this.grid[i].push(new Cell(i, j));
            }
        }
    }

    draw() {
        this.ctx.clearRect(0,0,this.canvas.with, this.canvas.width);

        for (let i = 0; i < this.rows; i += 1) {
            for (let j = 0; j < this.cols; j += 1) {
                this.grid[i][j].draw(this.ctx, this.cellWidth);
            }
        }
    }

    generate() {
        const start_x = randomInteger(0, this.cols);
        const start_y = randomInteger(0, this.rows);
        let currentCell = this.grid[start_x][start_y];
        let currentIndex = 0;
        let stack = [];
        const randomness = 0.25;

        currentCell.visited = true;

        while (currentCell != null) {
            let unvisitedNeighbors = currentCell.unvisitedNeighbors(this.grid);// Get unvisited neighbors

            if (unvisitedNeighbors.length > 0) {// If there are unvisited neighbors:
                const randomNeighborCell = unvisitedNeighbors[randomInteger(0, unvisitedNeighbors.length)];// - pick a random neighbor
                currentCell.punchWallDown(randomNeighborCell);// - carve a hole through the wall

                stack.push(currentCell);// - push current cell on stack
                currentCell = randomNeighborCell;// - make that neighbor the current cell
                currentCell.visited = true;
                currentIndex ++;

            } else {

                if (Math.random() < randomness){ //25% chance to pick a random cell in stack.
                    const randomIndex = randomInteger(0, stack.length);
                    currentCell = stack[randomIndex];
                    stack.splice(randomIndex, 1);

                    if (currentCell != null){
                    currentCell.random = true;
                    console.log("picked random cell, ", currentCell);
                    }

                }else{
                    currentCell = stack.pop();
                }

            }
            
            //this.draw();
            setInterval(10);

        }//end of while
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const maze = new Maze(20, 20, canvas);

    maze.generate();

    maze.draw();

    console.log(maze);
})
