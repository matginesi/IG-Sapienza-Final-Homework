/*
Questo script va implementato BENE e da capo, ma puo essere utile per capire come strutturare il passaggio
di info tra HTML e JS: per esempio "al click ---> i titoli diventano hidden" o "se gameOver ---> G.O.=visible"    
*/

//NB piu o meno ho gia implmentato in APP.JS la visibility



    initialize() {

        this.renderingContext.renderer.domElement.addEventListener('mousedown', (e) => this.onMouseDown(e));
        this.renderingContext.renderer.domElement.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.renderingContext.renderer.domElement.addEventListener('mouseup',(e)=>this.onMouseUp(e));
        this.renderingContext.startClassicButton.addEventListener('click',(e)=>this.onClassicMode(e));
        this.renderingContext.startFuturisticButton.addEventListener('click',(e)=>this.onFuturisticMode(e));
        this.renderingContext.startCustomClassicButton.addEventListener('click',(e)=>this.onCustomClassicMode(e));
        this.renderingContext.startCustomFuturisticButton.addEventListener('click',(e)=>this.onCustomFuturisticMode(e));
        this.renderingContext.returnMenuButton.addEventListener('click',(e)=>this.onReturn(e));
        
    }

    //OPERAZIONI MOUSE ? ? ? 

    onMouseUp(e){
        this.emit('mouseup', {})
    }

    onMouseDown(e) {

        this.emit('mousedown', {});
    }

    onMouseMove(e) {

        this.emit('mousemove', e);
    }


    //MARS
    onClassicMode(e) {
        this.renderingContext.inpageTitle[0].style.visibility = 'hidden';
        this.renderingContext.inpageTitle[1].style.visibility = 'hidden';
        this.renderingContext.startClassicButton.style.visibility = 'hidden';
        this.renderingContext.startFuturisticButton.style.visibility = 'hidden';
        this.renderingContext.startCustomClassicButton.style.visibility = 'hidden';
        this.renderingContext.startCustomFuturisticButton.style.visibility = 'hidden';
        this.renderingContext.heatBarContainer.style.visibility = 'visible';
        this.renderingContext.enemyCounter.style.visibility = 'visible';
        this.renderingContext.scoreCounter.style.visibility = 'visible';
        this.renderingContext.levelCounter.style.visibility = 'visible';
        this.emit('mountStorm', {custom:false});
    }

    //DARK
    onFuturisticMode(e) {
        this.renderingContext.inpageTitle[0].style.visibility = 'hidden';
        this.renderingContext.inpageTitle[1].style.visibility = 'hidden';
        this.renderingContext.startClassicButton.style.visibility = 'hidden';
        this.renderingContext.startFuturisticButton.style.visibility = 'hidden';
        this.renderingContext.startCustomClassicButton.style.visibility = 'hidden';
        this.renderingContext.startCustomFuturisticButton.style.visibility = 'hidden';
        this.renderingContext.heatBarContainer.style.visibility = 'visible';
        this.renderingContext.enemyCounter.style.visibility = 'visible';
        this.renderingContext.scoreCounter.style.visibility = 'visible';
        this.renderingContext.levelCounter.style.visibility = 'visible';
        this.emit('mountTPStorm', {custom:false});
    }

    //LANDSCAPE
    onCustomClassicMode(e) {
        this.renderingContext.inpageTitle[0].style.visibility = 'hidden';
        this.renderingContext.inpageTitle[1].style.visibility = 'hidden';
        this.renderingContext.startClassicButton.style.visibility = 'hidden';
        this.renderingContext.startFuturisticButton.style.visibility = 'hidden';
        this.renderingContext.startCustomClassicButton.style.visibility = 'hidden';
        this.renderingContext.startCustomFuturisticButton.style.visibility = 'hidden';
        this.renderingContext.heatBarContainer.style.visibility = 'visible';
        this.renderingContext.enemyCounter.style.visibility = 'visible';
        this.renderingContext.scoreCounter.style.visibility = 'visible';
        this.renderingContext.levelCounter.style.visibility = 'visible';
        this.emit('mountStorm', {custom:true});
    }



    //GAME OVER SETTING
    onGameOverUpdate(e) {
        this.renderingContext.gameOverText.innerHTML = e.end;
        this.renderingContext.gameOverText.style.visibility = 'visible';
        this.renderingContext.gameOverTitle.style.visibility = 'visible';
        this.renderingContext.returnMenuButton.style.visibility = 'visible';
    }
    onGameOverReset() {
        this.renderingContext.gameOverText.style.visibility = 'hidden';
        this.renderingContext.gameOverTitle.style.visibility = 'hidden';
        this.renderingContext.returnMenuButton.style.visibility = 'hidden';
    }