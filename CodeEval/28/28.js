(function numberPrototype() {
    var NumeralDigits = {
        0: ''
        , 1: 'One'
        , 2: 'Two'
        , 3: 'Three'
        , 4: 'Four'
        , 5: 'Five'
        , 6: 'Six'
        , 7: 'Seven'
        , 8: 'Eight'
        , 9: 'Nine'
        , 10: 'Ten'
        , 11: 'Eleven'
        , 12: 'Twelve'
        , 13: 'Thirteen'
        , 14: 'Fourteen'
        , 15: 'Fifteen'
        , 16: 'Sixteen'
        , 17: 'Seventeen'
        , 18: 'Eighteen'
        , 19: 'Nineteen'
    }
    var NumeralTens = {
        1: 'Ten'
        , 2: 'Twenty'
        , 3: 'Thirty'
        , 4: 'Forty'
        , 5: 'Fifty'
        , 6: 'Sixty'
        , 7: 'Seventy'
        , 8: 'Eighty'
        , 9: 'Ninety'
    }
    var NumeralBig = {
        3: 'Hundred'
        , 4: "Thousand"
        , 7: "Million"
        , 10: "Billion"
    }

    function toBaseNumerial(no) {
        //debugger; 
        var Numeral = ''
        var number = no.toString().split('').reverse()
        var len = number.length
        //debugger;
        if (len >= 3) {
            Numeral += NumeralDigits[number[2]] + NumeralBig[3]
        }
        var iTens = Number(number[1] + '' + number[0])
        if (iTens > 11 && iTens < 19) {
            Numeral += NumeralDigits[iTens]
        } else {
            if (len >= 2) {
                Numeral += NumeralTens[number[1]]
            }
            if (len >= 1) {
                Numeral += NumeralDigits[number[0]]
            }
        }

        return Numeral
    }
    function prettyPrint(no) {
        var Numeral = ''
        var number = no.toString().split('').reverse()
        var len = number.length

        if (len >= 10) {
            Numeral += toBaseNumerial([number[11] || '', number[10] || '', number[9]].join('')) + NumeralBig[6]
        }

        if (len >= 7) {
            Numeral += toBaseNumerial([number[8] || '', number[7] || '', number[6]].join('')) + NumeralBig[5]
        }
        if (len >= 4) {
            Numeral += toBaseNumerial([number[5] || '', number[4] || '', number[3]].join('')) + NumeralBig[4]
        }
        Numeral += toBaseNumerial([number[2] || '', number[1] || '', number[0]].join(''))

        return Numeral
    }

    Number.prototype.toNumerial = function () {
        return prettyPrint(this)
    }


    console.log(prettyPrint(1234))
    console.log( (1234).toNumerial() )


})()




  
      

//codeEvalExecute( 21130).write()
