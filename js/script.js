'use strict'
class Calculator{
    constructor(previousTextEl,currentTextEl){
        this.previousTextEl=previousTextEl;
        this.currentTextEl=currentTextEl;
        this.clear();
    }
    clear(){
        this.currentOperand="";
        this.previousOperand="";
        this.operation=undefined;

    }
    delete(){
        this.currentOperand=(this.currentOperand +"").slice(0,-1);

    }
    appendNumber(number){
        if(number==='.' && this.currentOperand.includes('.'))return;
        this.currentOperand=this.currentOperand +number + "";


    }
    chooseOperation(operation){
        if(this.currentOperand==="")return;
        if(this.previousOperand!==''){
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand="";
        

    }
    compute(){
        let computation;
        const prev=parseFloat(this.previousOperand);
        const current=parseFloat(this.currentOperand);
       
        if(!prev || !current)return;
        switch(this.operation){
            case '+':
                computation=prev+current;
                break
            case '*':
                computation=prev*current;
                break
            case '-':
                computation=prev-current;
                break
            case '/':
                computation=prev/current;
                break
            default:return

        }
        
        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand="";
        
        

    }
    getDisplayNumber(number){
        //seperate each 3 digits with comma;
        //you need to fix when 4 digits then press comma
        const numberString=(number+"").split('');
        let str="";
        
        for(let i=0;i<numberString.length;i++){
            
            
            if(i%3===0 && i!==0 && numberString[i]!=='.'){
                if(numberString.includes('.')){
                    str=str+numberString[i];
                }
                else{
                    str=str+','+numberString[i];
            }
                
                
                
            }
            else{
                str=str+numberString[i];
            }
        }
        
           
           
            
        
        return str;
       
            
            
        
       
    }
    updateDisplay(){
        this.currentTextEl.innerText=this.getDisplayNumber(this.currentOperand);
        if(this.operation){
        this.previousTextEl.innerText=`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;

        }
        else{
            this.previousTextEl.innerText=this.previousOperand;
        }
        

    }
}
const numberBTNs=document.querySelectorAll('[data-number]');
const operationBTNs=document.querySelectorAll('[data-operation');
const equalsBTN=document.querySelector('[data-equal');
const deleteBTN=document.querySelector('[data-delete]');
const allClearBTN=document.querySelector('[data-all-clear]');
const previousTextEl=document.querySelector('[data-previous]');
const currentTextEl=document.querySelector('[data-current]');
const calculator=new Calculator(previousTextEl,currentTextEl);

numberBTNs.forEach(btn=>{
    btn.addEventListener('click',()=>{
        calculator.appendNumber(btn.innerText);
        //update the value each time we press a button
        calculator.updateDisplay();
    })
})
operationBTNs.forEach(btn=>{
    btn.addEventListener('click',()=>{
        calculator.chooseOperation(btn.innerText);
        //update the value each time we press a button
        calculator.updateDisplay();
    })
})
equalsBTN.addEventListener('click',()=>{
    calculator.compute();
    calculator.updateDisplay();
})
allClearBTN.addEventListener('click',()=>{
    calculator.clear();
    calculator.updateDisplay();
})
deleteBTN.addEventListener('click',()=>{
    calculator.delete();
    calculator.updateDisplay();
})

