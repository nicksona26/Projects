import numpy as np

inputs = [1, 2, 3, 2.5]

weights = [[0.2, 0.8, -0.5, 1.0],[0.5, -0.91, 0.26, -0.5],[-0.26, -0.27, 0.17, 0.87]] # these are all the paths to the 3 outputs EACH NESTED ARRAY IS THE SEQUENTIAL PATH FROM EACH INPUT 
# so the first array is each inputs first path second array is each inputs second path
# so each array within the weights array are all the paths going to the 3 outputs
# so the input 1 has three paths (0.2, 0.5, -0.26)
# so each output neuron is getting a weight input calculation from each input

biases = [2,3,0.5]


output = np.dot(weights, inputs) + biases
print(output)



# it is necessary to have to adjustable values wieght and bias to change the value of output
# think of it as a simple line 
    # output = weight * input + bias