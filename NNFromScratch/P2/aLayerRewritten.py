
inputs = [1, 2, 3, 4]

weights = [[0.2, 0.8, 0.5, 1.0],[0.5, -0.91, 0.26, -0.5],[-0.26, -0.27, 0.17, 0.81]]

biases = [2,3,0.5]


#zip combines two lists into a list of lists element wise
# 1 to 0.2, 1 to 0.5, 1 to -0.26



layerOutputs = [] #output of current layer
for neuronWeights, neuronBias in zip(weights, biases):
    neuronOutput = 0 #output of a given neuron
    for nInput, weight in zip(inputs, neuronWeights):
        neuronOutput += nInput*weight
    neuronOutput += neuronBias
    layerOutputs.append(neuronOutput)


