#weights will eventually be randomly generated and tweaked during back propogation
#now we are going to do a layer of 3 neurons with 4 inputs each

#this input could be an input layer or output from a neuron getting accepted by our current neuron
#however for this one our current neuron is going to be an output layer neuron so we are going to have 4 inputs
inputs = [1, 2, 3, 4]

weight1 = [0.2, 0.8, 0.5, 1.0]
weight2 = [0.5, -0.91, 0.26, -0.5]
weight3 = [-0.26, -0.27, 0.17, 0.81]

#every unique neuron has a unique bias
bias1 = 2
bias2 = 3
bias3 = 0.5

#all inputs * the matching weight plus the bias at the end
output = [inputs[0] * weight1[0] + inputs[1] * weight1[1] + inputs[2] * weight1[2] + inputs[3] * weight1[3] + bias1,
          inputs[0] * weight2[0] + inputs[1] * weight2[1] + inputs[2] * weight2[2] + inputs[3] * weight2[3] + bias2,
          inputs[0] * weight3[0] + inputs[1] * weight3[1] + inputs[2] * weight3[2] + inputs[3] * weight3[3] + bias3]

print(output) # this is the output from our one output neuron




