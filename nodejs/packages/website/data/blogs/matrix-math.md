# 矩阵变换计算

Web 3d中常常用到矩阵变换，这里记录一下矩阵变换的计算方式

三维变换矩阵，这种矩阵由一个4x4方阵，共16个值组成。
在JavaScript中，可以很方便的用数组表示矩阵。比如典型的单位矩阵。
单位阵乘上一个点或者矩阵， 其结果保持不变。

**单位矩阵**
```javascript
const identityMatrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];
```

三维空间中的点和一个4x4矩阵并不匹配，加上了额外的第四维W。一般来说，把W设为1就可以了。
W维度还有一些额外的用途（[WebGL model view projection - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_model_view_projection)）。

矩阵与点的对齐
```javascript
[1, 0, 0, 0,
 0, 1, 0, 0,
 0, 0, 1, 0,
 0, 0, 0, 1]

[4, 3, 2, 1]
```


### 定义相乘函数

**矩阵与点相乘**
```javascript
function multiplyMatrixAndPoint(matrix, point) {

  // 给矩阵的每一部分一个简单的变量名, 列数（c）与行数（r）
  var c0r0 = matrix[ 0], c1r0 = matrix[ 1], c2r0 = matrix[ 2], c3r0 = matrix[ 3];
  var c0r1 = matrix[ 4], c1r1 = matrix[ 5], c2r1 = matrix[ 6], c3r1 = matrix[ 7];
  var c0r2 = matrix[ 8], c1r2 = matrix[ 9], c2r2 = matrix[10], c3r2 = matrix[11];
  var c0r3 = matrix[12], c1r3 = matrix[13], c2r3 = matrix[14], c3r3 = matrix[15];

  // 定义点坐标
  var x = point[0];
  var y = point[1];
  var z = point[2];
  var w = point[3];

  // 点坐标和第一列对应相乘, 再求和
  var resultX = (x * c0r0) + (y * c0r1) + (z * c0r2) + (w * c0r3);

  // 点坐标和第二列对应相乘, 再求和
  var resultY = (x * c1r0) + (y * c1r1) + (z * c1r2) + (w * c1r3);

  // 点坐标和第三列对应相乘, 再求和
  var resultZ = (x * c2r0) + (y * c2r1) + (z * c2r2) + (w * c2r3);

  // 点坐标和第四列对应相乘, 再求和
  var resultW = (x * c3r0) + (y * c3r1) + (z * c3r2) + (w * c3r3);

  return [resultX, resultY, resultZ, resultW]
}

```

可以使用这个函数将任意点乘以单位矩阵，还会返回这个点

```javascript
// identityResult等于[4,3,2,1]
const identityResult = multiplyMatrixAndPoint(identityMatrix, [4,3,2,1]);
```

**两个矩阵相乘**

```javascript
function multiplyMatrices(matrixA, matrixB) {

  // 将第二个矩阵按列切片
  var column0 = [matrixB[0], matrixB[4], matrixB[8], matrixB[12]];
  var column1 = [matrixB[1], matrixB[5], matrixB[9], matrixB[13]];
  var column2 = [matrixB[2], matrixB[6], matrixB[10], matrixB[14]];
  var column3 = [matrixB[3], matrixB[7], matrixB[11], matrixB[15]];

  // 将每列分别和矩阵相乘
  var result0 = multiplyMatrixAndPoint( matrixA, column0 );
  var result1 = multiplyMatrixAndPoint( matrixA, column1 );
  var result2 = multiplyMatrixAndPoint( matrixA, column2 );
  var result3 = multiplyMatrixAndPoint( matrixA, column3 );

  // 把结果重新组合成矩阵
  return [
    result0[0], result1[0], result2[0], result3[0],
    result0[1], result1[1], result2[1], result3[1],
    result0[2], result1[2], result2[2], result3[2],
    result0[3], result1[3], result2[3], result3[3]
  ]
}
```

实际计算
```javascript
const someMatrix = [
  4, 0, 0, 0,
  0, 3, 0, 0,
  0, 0, 5, 0,
  4, 8, 4, 1
]

const identityMatrix = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
];

// 返回someMatrix的数组表示
const someMatrixResult = multiplyMatrices(identityMatrix, someMatrix);
```

> 这些函数是为了介绍计算方式而创建的，计算过程创建了大量的数组，性能很差，真实场景计算需要使用TypedArray来做计算。可以使用矩阵计算库 [GitHub - toji/gl-matrix: Javascript Matrix and Vector library for High Performance WebGL apps](https://github.com/toji/gl-matrix)


### 平移矩阵

平移矩阵基于单位矩阵。它将一个对象沿x，y，z其中一个方向进行移动。最简单的想象平移的方式是设想拿起一个咖啡杯。咖啡杯必须保持直立和朝向以免咖啡洒出来。它可以离开桌子在空间中移动。

现在我们还喝不到这个杯子里的咖啡，因为在平移矩阵的单独作用下杯子并不能倾斜。在之后的部分，我们会讨论新的矩阵，来解决这个问题。

```javascript
const x = 50;
const y = 100;
const z = 0;

const translationMatrix = [
    1,    0,    0,   0,
    0,    1,    0,   0,
    0,    0,    1,   0,
    x,    y,    z,   1
];
```

### 缩放矩阵

缩放矩阵使对象的高度、宽度和深度三个维度的其中之一变大或变小。在典型（笛卡尔）坐标系中， 这将使得x，y，z坐标拉伸或收缩。

```javascript
var w = 1.5; // width  (x)
var h = 0.7; // height (y)
var d = 1;   // depth  (z)

var scaleMatrix = [
    w,    0,    0,   0,
    0,    h,    0,   0,
    0,    0,    d,   0,
    0,    0,    0,   1
];
```

### 旋转矩阵

```javascript
const { sin, cos } = Math;

function rotateAroundXAxis(a) {

  return [
       1,       0,        0,     0,
       0,  cos(a),  -sin(a),     0,
       0,  sin(a),   cos(a),     0,
       0,       0,        0,     1
  ];
}

function rotateAroundYAxis(a) {

  return [
     cos(a),   0, sin(a),   0,
          0,   1,      0,   0,
    -sin(a),   0, cos(a),   0,
          0,   0,      0,   1
  ];
}

function rotateAroundZAxis(a) {

  return [
    cos(a), -sin(a),    0,    0,
    sin(a),  cos(a),    0,    0,
         0,       0,    1,    0,
         0,       0,    0,    1
  ];
}
```

### 矩阵组合

矩阵的真正厉害之处在于矩阵的组合。当一组特定类型的矩阵连乘起来，它们保留了变换的经过并且是可逆的。这意味着如果平移、旋转和缩放矩阵组合在一起，当我们使用逆变换并颠倒应用的顺序，可以得到原来的点。

矩阵相乘的结果与顺序有关。两个数相乘时，a * b = c, 和 b * a = c 都是正确的。例如，3 * 4 = 12, 和 4 * 3 = 12。在数学上这些数被称为**可交换**。矩阵不能保证交换顺序后的运算结果，所以矩阵是**不可交换**的。

另一个需要记住的点是在WebGL和CSS3中的矩阵相乘需要和变换发生的顺序相反。例如，缩放对象到80%，向下移动200像素，然后绕原点旋转90度在伪代码中应该像下面这样。

```javascript
transformation = rotate * translate * scale
```

