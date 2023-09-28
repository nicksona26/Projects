import math
import numpy as np
import nnfs

nnfs.init()

layerOutputs = [[4.8, 1.21, 2.385],
                [8.9, -1.81, 0.2],
                [1.41, 1.051, 0.026]]

E = math.e

expValues = np.exp(layerOutputs)

# .sum adds all values in layerOutputs so we need to sum by row 
# this is done with axis=1 and keepdims=True

normValues = expValues / np.sum(expValues, axis=1, keepdims=True)

# as we exponentiate larger values we quickly reach overflow which throws a run time warning
# the solution to this is to take the largest input and subtract each num in the array by the largest value so that now the largest value is 0

# has no ultimate effect on output values (they are the same)

