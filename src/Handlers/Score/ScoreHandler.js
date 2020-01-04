import { Score, SCORE_TYPE } from "./Score";

const SCORE_COOKIE_NAME = 'score'

export class ScoreHandler {
    constructor(cookieHandler) {
        this.cookieHandler = cookieHandler;
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

    getScoreForUi() {
        const oldScore = this.cookieHandler.getCookie(SCORE_COOKIE_NAME);
        this.cookieHandler.setCookie(SCORE_COOKIE_NAME, this.score);
        if (oldScore == null) {
            return new Score(SCORE_TYPE.HIGHSCORE, this.score); 
        } else if (oldScore < this.score) {
            return new Score(SCORE_TYPE.HIGHSCORE, this.score); 
        } else {
            return new Score(SCORE_TYPE.NORMALSCORE, this.score, oldScore); 
        }
    }
}