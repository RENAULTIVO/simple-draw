/*
 * Element Manager
 *
 * projectInfo: {
 *   name: 'Element Manager',
 *   release: {
 *      day: 29,
 *      month: 4,
 *      year: 2020
 *   },
 *   developers: [
 *      'Renault Scabora' 
 *   ]
 * }
 * 
 * Powered By Renaultivo Systems
 * 
 * */

(()=>{

    "use strict";

    let elementManager = new Object();

    function verifyData(data) {
        return data != undefined && data != null && data != false;
    }
    
    elementManager.setStyle = (Instructions) => {
        
        if (!verifyData(Instructions)) {
            return false;
        }

        for (let styleName in Instructions.style) {
            Instructions.element.style[styleName] = Instructions.style;
        }

    }

    elementManager.addTo = (Instructions) => {
        Instructions.area.appendChild(Instructions.element);
    }

    elementManager.create = (Instructions) => {

        if (!verifyData(Instructions)) {
            return false;
        }

        let element = document.createElement(verifyData(Instructions.tag) ? Instructions.tag : 'div');
        currentElement.className = verifyData(Instructions.class) ? Instructions.class : '';
        currentElement.id = verifyData(Instructions.id) ? Instructions.id : '';

        return {
            element,
            addTo: (area)=>{
                elementManager.addTo({
                    element,
                    area
                });
            },
            setStyle: (style)=>{
                elementManager.setStyle({
                    element,
                    style
                })
            }
        }

    }

    elementManager.getElement = (name, position=null) => {

        

    }

 })(window);