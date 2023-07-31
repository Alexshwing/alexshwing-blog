# 树状数组
```python
class BIT:
    def __init__(self, n):
        self.tree = [0] * n

    # 将下标 i 上的数加 x
    def add(self, i: int, x: int) -> None:
        while i < len(self.tree):
            self.tree[i] += x
            i += i & -i

    # 返回闭区间 [1, i] 的元素和
    def sum(self, i: int) -> int:
        res = 0
        while i > 0:
            res += self.tree[i]
            i &= i - 1
        return res

    # 返回闭区间 [left, right] 的元素和
    def query(self, left: int, right: int) -> int:
        return self.sum(right) - self.sum(left - 1)
```