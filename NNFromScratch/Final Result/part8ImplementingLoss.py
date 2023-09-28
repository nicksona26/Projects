import numpy as np
import nnfs
from nnfs.datasets import spiral_data

# Initialize the nnfs library, which helps with neural network code examples.
nnfs.init()

# Define a dense layer class.
class layerDense:
    def __init__(self, nInputs, nNeurons):
        # Initialize weights with random values and biases with zeros.
        self.weights = 0.10 * np.random.randn(nInputs, nNeurons)
        self.biases = np.zeros((1, nNeurons))

    def forward(self, inputs):
        # Compute the dot product of inputs and weights, then add biases.
        self.output = np.dot(inputs, self.weights) + self.biases

# Define the ReLU activation class.
class activationReLU:
    def forward(self, inputs):
        # Apply ReLU activation function element-wise.
        self.output = np.maximum(0, inputs)

# Define the softmax activation class.
class activationSoftMax:
    def forward(self, inputs):
        # Compute the softmax activation for input data.
        expValues = np.exp(inputs - np.max(inputs, axis=1, keepdims=True))
        probabilities = expValues / np.sum(expValues, axis=1, keepdims=True)
        self.output = probabilities

# Define a base class for loss functions.
class Loss:
    def calculate(self, output, y):
        sampleLosses = self.forward(output, Y)  # There's a typo; it should be 'y' instead of 'Y'.
        dataLoss = np.mean(sampleLosses)
        return dataLoss

# Define a categorical cross-entropy loss class inheriting from Loss.
class Loss_CategoricalCrossEntropy(Loss):
    def forward(self, yPred, yTrue):
        samples = len(yPred)
        yPredClipped = np.clip(yPred, 1e-7, 1 - 1e-7)

        if len(yTrue.shape) == 1:
            correctConfidences = yPredClipped[range(samples), yTrue]
        elif len(yTrue.shape) == 2:
            correctConfidences = np.sum(yPredClipped * yTrue, axis=1)

        negativeLogLikelihoods = -np.log(correctConfidences)
        return negativeLogLikelihoods

# Generate synthetic spiral data with 100 samples and 3 classes.
X, Y = spiral_data(samples=100, classes=3)

# Initialize the first dense layer with 2 input neurons and 3 output neurons.
dense1 = layerDense(2, 3)
activation1 = activationReLU()  # Initialize the ReLU activation.

# Initialize the second dense layer with 3 input neurons and 3 output neurons.
dense2 = layerDense(3, 3)
activation2 = activationSoftMax()  # Initialize the softmax activation.

# Perform the forward pass through the first dense layer.
dense1.forward(X)
activation1.forward(dense1.output)

# Perform the forward pass through the second dense layer.
dense2.forward(activation1.output)
activation2.forward(dense2.output)

# Print the first 5 rows of the output from the softmax activation.
print(activation2.output[:5])

# Initialize the categorical cross-entropy loss function.
lossFunction = Loss_CategoricalCrossEntropy()

# Calculate and print the loss using the network's output and true labels.
loss = lossFunction.calculate(activation2.output, Y)




