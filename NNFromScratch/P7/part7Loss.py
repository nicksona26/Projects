# The go to loss function for classification using softmax function is categorical cross-entropy
# this is basically a negative log function

import math

softmaxOutput = [0.7, 0.1, 0.2]

targetOutput = [1, 0, 0]

loss = -(math.log(softmaxOutput[0]) * targetOutput[0] +
         math.log(softmaxOutput[1]) * targetOutput[1] +
         math.log(softmaxOutput[2]) * targetOutput[2] )

# put simply it can be this
# loss = -math.log(softmax_output[0])

# as confidence gets lower loss increases
