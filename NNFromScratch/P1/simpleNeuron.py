#each connection is a unique weight
#each neuron is a unique bias

#these are the outputs from previous neurons to our current neuron
inputs = [1.2, 5.1, 2.1]
weights = [3.1, 2.1, 8.7]

#every unique neuron has a unique bias
bias = 3

#all inputs * the matching weight plus the bias at the end
output = inputs[0] * weights[0] + inputs[1] * weights[1] + inputs[2] * weights[2] + bias

print(output)
