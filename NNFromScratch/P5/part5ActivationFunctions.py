# a variety of activation functions can be used in a NN
# In this case we are using a step function
# this step function outputs 1 if x > 0 and 0 if x <= 0



# the activation function is applied at each neuron after the weights and biases are applied


# turns out sigmoid functions are more reliable than step functions in NN

# step functions don't have the granularity to determine an effective amount of loss to pass to optimization

# certain neurons function at certain times to achieve a desired output
# they do not all function at once typically


import numpy as np

np.random.seed(0)

X = [[1, 2, 3, 2.5],
     [2.0, 5.0, -1.0, 2.0],
     [-1.5, 2.7, 3.3, -0.8]]

inputs = [0, 2, -1, 3.3, -2.7, 1.1, 2.2, -100]

output = []

# Rectified Linear Activation Function
# everything is clipped from 0 and below to be 0
for i in inputs:
    if i > 0:
        output.append(i)
    elif i <= 0:
        output.appendd(0)
    # or can do output.append(max(0,i))

print(output)



