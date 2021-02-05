import matplotlib.pyplot as plt
import numpy as np

# x = np.linspace(-1,1,50)
# y = 2*x + 1

# plt.figure()
# plt.plot(x,y)
# plt.show()
n = 1024    # data size
X = np.random.normal(0, 1, n) # 每一个点的X值
Y = np.random.normal(0, 1, n) # 每一个点的Y值
T = np.arctan2(Y,X) # for color value

plt.figure()
ax = plt.gca()
# ax.spines['bottom'].set_position(('data',0))
# ax.spines['left'].set_position(('data',0))
# ax.spines['top'].set_color('none')
# ax.spines['right'].set_color('none')
plt.scatter(X,Y,c=T,s=20)
plt.xlim(-0.5,0.5)
plt.show()