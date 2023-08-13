# 数学

## 快速幂
```python
# pow(a, b, MOD)
def qmi(a: int, b: int, MOD: int = 10 ** 9 + 7) -> int:
    res = 1
    while b:
        if b & 1: res = res * a % MOD
        a = a * a % MOD
        b = b // 2
    return res
```

## 不同质因子数目
预处理 [1, MX] 不同质因子数目
```python
MX = 10 ** 5 + 1
omega = [0] * MX
for i in range(2, MX):
    if not omega[i]:  # i 是质数
        for j in range(i, MX, i):
            omega[j] += 1  # i 是 j 的一个质因子
```