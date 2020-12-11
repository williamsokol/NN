

class NeuralNetwork{

    constructor(numI,numH,numO)
    {
        this.input_nodes = numI;
        this.hidden_nodes = numH;
        this.output_nodes = numO;

        this.ih_weights = new Matrix(this.hidden_nodes,this.input_nodes);
        this.ho_weights = new Matrix(this.output_nodes,this.hidden_nodes);
        
        this.ih_weights.randomize();
        this.ho_weights.randomize();
        //this.ih_weights.show();
        this.h_bias = new Matrix(this.hidden_nodes,1);
        this.o_bias = new Matrix(this.output_nodes,1);
        this.h_bias.randomize();
        this.o_bias.randomize();
        this.learning_rate = .1;
    
    }
    
    FeedForward(input_array)
    {
        //find hidden outputs
        let  inputs = Matrix.FromArray(input_array)
      
        //////this.ih_weights.show();
        let hidden = Matrix.multiply(this.ih_weights,inputs);
        
        //hidden.show();
        hidden.add(this.h_bias);
        
        //activation function
        hidden.map(sigmoid);
        
        
        // making a output
        let output = Matrix.multiply(this.ho_weights,hidden);
        
        //activation function
        output.add(this.o_bias);
        output.map(sigmoid);

        // sending output
       
        return output.ToArray();

    }
	
	train(input_array,target_array){
        //find hidden outputs
        let  inputs = Matrix.FromArray(input_array)
        let hidden = Matrix.multiply(this.ih_weights, inputs);
    
        //console.log(hidden);
        hidden.add(this.h_bias);
        
        //activation function
        hidden.map(sigmoid);

        // making a output
        let outputs = Matrix.multiply(this.ho_weights,hidden);
        
        //activation function
        outputs.add(this.o_bias);
        outputs.map(sigmoid);

        //-------------^this is the feed foraward up here^

		let targets = Matrix.FromArray(target_array);
		//calculate the error
        let output_errors = Matrix.subtract(targets , outputs);
        
        // gradients are how wrong we were
        
        let gradients = Matrix.Map(outputs , dsigmoid);
        gradients.multiply(output_errors);
        gradients.multiply(this.learning_rate);
        
        //console.log(gradients);
        //calculate deltas 
        let hidden_T = Matrix.Transpose(hidden);
        
        let weight_ho_deltas = Matrix.multiply(gradients, hidden_T);

        //adjust deltas by weights
        this.ho_weights.add(weight_ho_deltas);
        //adjust deltas by biases
        this.o_bias.add(gradients);

        //----^this is the training of the hidden->output weights^

        //calculate the hidden->output layers error
        let who_t = Matrix.Transpose (this.ho_weights);
        let hidden_errors = Matrix.multiply(who_t,output_errors); 

        // calculate hidden gradient
        let hidden_gradients = Matrix.Map(hidden ,dsigmoid);
        hidden_gradients.multiply(hidden_errors);
        hidden_gradients.multiply(this.learning_rate);

        // calculate hidden->input weight deltas
        let inputs_T = Matrix.Transpose(inputs);
        let weight_ih_deltas = Matrix.multiply(hidden_gradients,inputs_T);

        //adjust deltas by weights
        this.ih_weights.add(weight_ih_deltas);
        //adjust deltas by biases
        this.h_bias.add(hidden_gradients); 

        //----^this is the training of the inputs->hidden weights^

        //now the weights have been adjusted and it can be trained repeatedly
	}

}