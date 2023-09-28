import numpy as np

np.random.seed(0)

def createData(points, classes):
    X = np.zeros((points*classes, 2))
    Y = np.zeros(points*classes, dtype = 'uint8')
    for classNum in range(classes):
        ix = range(points*classNum, points*(classNum+1))
        r = np.linspace(0.0, 1, points) #radius
        t = np.linspace(classNum*4, (classNum+1)*4, points) + np.random.randn(points)*0.2
        X[ix] = np.c_[r*np.sin(t*2.5), r*np.cos(t*2.5)]
        Y[ix] = classNum
    return X, Y



import matplotlib.pyplot as plt


print("here")
X, Y = createData(100, 3)

plt.scatter(X[:,0], X[:,1])
plt.show()

plt.scatter(X[:,0], X[:,1], c=Y, cmap="brg")
plt.show()




# this creates a spiral scatter plot where each classNum is a rung on the spiral