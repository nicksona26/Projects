import numpy as np

np.random.seed(0)



X = [[1, 2, 3, 2.5],[2.0,5.0,-1.0,2.0],[-1.5,2.7,3.3,-0.8]] # X typically represents our actual training data set

class layerDense:
    def __init__(self, nInputs, nNeurons):
        self.weights = 0.10 * np.random.randn(nInputs, nNeurons) # compared to part 3 switched the order of inputs and neurons so we don't have to do any transposing
        self.biases = np.zeros((1, nNeurons))
    def forward(self,inputs): #inputs here could be original inputs or outputs from a previous layer
        self.output = np.dot(inputs, self.weights) + self.biases

#now make two layers

layer1 = layerDense(4,5) #inputs, neurons
layer2 = layerDense(5,2) #input has to be output from previous layer (5)

layer1.forward(X)
print(layer1.output) #this outputs the outputs for our first layer (5 each per set of input data X[?])
layer2.forward(layer1.output)
print(layer2.output)






#print(0.10*np.random.randn(4, 3)) 
# # 4 inputs and 3 neurons THIS GENERATES OUR MATRIX OF WEIGHTS FOR 4 INPUTS TO 3 NEURONS
# this creates 4 arrays with 3 items each






#weights and biases need to be initalized if this is the first training section
#weights are typically initialized between -0.1 and 0.1
#biases are typically initialized at 0 but if neurons aren't firing (no output) you have to change the bias




# go through and do visualizations of each of these files 