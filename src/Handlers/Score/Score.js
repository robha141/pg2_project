export const SCORE_TYPE = {
    HIGHSCORE: 0,
    NORMALSCORE: 1
}

export class Score {
    constructor(type, value, oldValue = null) {
        this.type = type;
        this.value = value;
        this.oldValue = oldValue;
    }
}