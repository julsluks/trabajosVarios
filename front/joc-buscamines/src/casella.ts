class Casella {
    
    public esMina: boolean; //Un booleà que indica si la casella conté una mina.
    public revelada: boolean; //Un booleà que indica si la casella ha estat revelada.
    public marcada: boolean; //Un booleà que indica si la casella ha estat marcada com a possible mina.

    constructor(mina: boolean) {
        this.esMina = mina;
        this.revelada = false;
        this.marcada = false;
    }

}