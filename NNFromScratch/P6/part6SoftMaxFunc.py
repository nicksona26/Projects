# first step in training a model is determing how wrong the outputs are

# problem with linear is when final outputs are negative values and youre trying to get a probability distribution (no negatives)

# problem with ReLU is that when final output is a negative it is clipped to a 0 and this is overgeneralization (how negative was it? We don't know)

# well why not just square the output? Because a -9 that is square to 18 is much different than a 9 that is sqaured to 18

# ENTER EXPONENTIAL FUNCTION

# y = e^x

# this makes sure no output can be negative after passing through exponentiation


import numpy as np
import nnfs

nnfs.init()
layerOutputs = [4.8, 1.21, 2.385]

expValues = np.exp(layerOutputs)

# now after exponentiation we need to normalize these values

# our normalization function will be a single output divided by the sum of all other outputs in that layer
# this gives us the probability distribution that we want

normVals = expValues / np.sum(expValues)

#this should add up to one or very close to one
print(sum(normVals))

# the process of taking the final outputs as input, exponentiating them, normalizing them, and then outputing them is the Softmax Function


