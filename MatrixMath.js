// var m = new Matrix(2,3);

class Matrix{
    constructor(rows_,colums_){
        this.rows = rows_;
        this.colums = colums_;
        this.data = []

        for (var i=0;i<this.rows;i++){
            this.data[i] = [];

            for(var j=0;j<this.colums;j++){
                this.data[i][j] = 0;
                //this.show();
            }
        }
        //console.log(this.data );//+ "|"+this.rows+"|"+this.colums);
        
    }
    static multiply (a,b){
        //matrix product
        //console.log(b);
        if(a.colums !== b.rows){
            console.log("cols of A not equal rows of B" + a.colums +" "+ b.rows);
            
            return undefined;
        }
        let result = new Matrix(a.rows,b.colums);
        
        
        for (var i=0;i<result.rows;i++){
            for(var j=0;j<result.colums;j++){
                var sum =0;
                for(var k=0;k<a.colums;k++){
                    
                    sum += a.data[i][k] * b.data[k][j];
                    
                }
                result.data[i][j] = sum;
            }
        }
        return result; 
    }

    multiply(n){
        if(n instanceof Matrix){
            for (var i=0;i<this.rows;i++){
                for(var j=0;j<this.colums;j++){
                    this.data[i][j]*= n.data[i][j]; 
                }
            }
        }else{
            for (var i=0;i<this.rows;i++){
                for(var j=0;j<this.colums;j++){
                    //console.log( n );
                    this.data[i][j] *= n; 
                    
                }
            }
        }
        
    }

    map(fn){
        //scalar product
        for (var i=0;i<this.rows;i++){
           for(var j=0;j<this.colums;j++){
               let val = this.data[i][j];
               this.data[i][j] = fn(val); 
           }
       }
    }
    static Map(matrix,fn){
        let result = new Matrix(matrix.rows,matrix.colums);
        for (var i=0;i<result.rows;i++){
           for(var j=0;j<result.colums;j++){
               let val = matrix.data[i][j];
               result.data[i][j] = fn(val); 
           }
       }
       return result;
    }

    static Transpose(matrix){
        let result = new Matrix(matrix.colums,matrix.rows);
        for (var i=0;i<matrix.rows;i++){
            for(var j=0;j<matrix.colums;j++){
                //console.log(matrix.data[i][1]);
                result.data[j][i] = matrix.data[i][j]; 
            }
        }
        return result;
    }
    add(n){
        if(n instanceof Matrix){
            for (var i=0;i<this.rows;i++){
                for(var j=0;j<this.colums;j++){
                    this.data[i][j]+= n.data[i][j]; 
                }
            }
        }else{
            for (var i=0;i<this.rows;i++){
                for(var j=0;j<this.colums;j++){
                    this.data[i][j]+= n; 
                }
            }
        }
    }
	
	static subtract(a,b){
		// return matrix a-b
		
        let result = new Matrix(a.rows,a.colums);
        for(let i=0;i<result.rows;i++){
            for(let j=0;j<result.colums;j++){
                result.data[i][j] = a.data[i][j] - b.data[i][j];
            }
        }
        return result;
	}

    static FromArray(arr){
        // console.log(arr);
        let m = new Matrix(arr.length,1);
        for(let i = 0;i<arr.length;i++){
            m.data[i][0] = arr[i];
        }
        return m;
    }

    ToArray(){
        let arr = [];
        for(let i=0;i<this.rows;i++){
            for(let j=0;j<this.colums;j++){
                arr.push(this.data[i][j]); 
            }
        }
        return arr;
    }
    randomize(){
        for (var i=0;i<this.rows;i++){
            for(var j=0;j<this.colums;j++){
                this.data[i][j] = getRndInteger(-1,1);
                //console.log(this.data[i][j]+" slot:"+ j); 
                //console.log(); 
            }
        }
        //console.log("testing"+ this.data[0][0]); 
    }

    Dot(){
        for(var i=0;i<this.rows;i++){
            sum += this.rows[i] * input[i]; 
        }
    }
    show(){
        console.table(this.data);
    }
   
}
