export class ScoreHandler {
    constructor() {
        this.score = 0;
        this.uninteruptedKillCount = 0;
    }

    resetUninterauptedKillCount() {
        this.uninteruptedKillCount = 0;
    }

    enemyKill() {
        this.uninteruptedKillCount++;
        if (this.uninteruptedKillCount < 5) {
            this.score += 1;
        } else if (this.uninteruptedKillCount < 10) {
            this.score += 2;
        } else if (this.uninteruptedKillCount < 15) {
            this.score += 3;
        } else {
            this.score += 4;
        }
    }

    reset() {
        this.resetUninterauptedKillCount();
        this.score = 0;
    }
}