import numpy as np

np.random.seed(0)


X = [[1],[2.5],[3]] # 3 sets of 4


class layerDense:
    def __init__(self,nInputs,nNeurons): # this function generates the weights and biases (constructor)
        self.weights = 0.34 * np.random.randn(nInputs, nNeurons) 
        #self.biases = np.zeros((1, nNeurons )) # out puts a 2D array filled with n = nNeurons zeros [[0 0 0 0 0 0]]
        biasArr = np.array([])
        onesArr = np.ones(nNeurons, dtype=int)
        finalArr = np.insert(biasArr, 0 ,onesArr)
        self.biases = finalArr
    def forward(self,inputs): #inputs here could be original inputs or outputs from a previous layer
        self.output = np.dot(inputs, self.weights) + self.biases #inputs * weights + the bias

layer1 = layerDense(1,3) 
layer2 = layerDense(3,3) 
layer3 = layerDense(3,3)
layer4 = layerDense(3,1)

layer1.forward(X)
layer2.forward(layer1.output)
layer3.forward(layer2.output)
layer4.forward(layer3.output)

print("Our final output is \n", layer4.output)



