# 换根DP

## 模板
```python
"""
ReRooting
V: 节点数
f: 符合结合律的统计某个点的贡献的运算
merge: 两个子树合并的运算
mi: merge运算的单位元
g: 从子树转移过来的时候是否有额外运算

https://null-mn.hatenablog.com/entry/2020/04/14/124151
https://leetcode.cn/problems/difference-between-maximum-and-minimum-price-sum/solution/by-onjoujitoki-zktd/
https://github.com/981377660LMT/algorithm-study/blob/master/6_tree/%E7%BB%8F%E5%85%B8%E9%A2%98/%E5%90%8E%E5%BA%8Fdfs%E7%BB%9F%E8%AE%A1%E4%BF%A1%E6%81%AF/%E6%8D%A2%E6%A0%B9dp/Rerooting.py
"""
from typing import List, Callable, Generic, TypeVar
T = TypeVar("T")
class ReRooting(Generic[T]):
    __slots__ = ("V", "G", "dp", "f", "merge", "mi", "g")

    def __init__(self, V: int, f: Callable[[T, int], T], merge: Callable[[T, T], T], mi: T, g: [[T, int], T]):
        self.V = V
        self.G = [[] for _ in range(V)]
        self.dp = [[] for _ in range(V)]
        self.f = f
        self.merge = merge
        self.mi = mi
        self.g = g
    
    def read(self, idx = 1):
        for _ in range(self.V - 1):
            a, b = map(int, input().split())
            a -= idx
            b -= idx
            self.G[a].append(b)
            self.G[b].append(a)
    
    def add_edge(self, a, b):
        self.G[a].append(b)
        self.G[b].append(a)
    
    def dfs1(self, p, v) -> T:
        res = self.mi
        for i in range(len(self.G[v])):
            if self.G[v][i] == p: continue
            self.dp[v][i] = self.dfs1(v, self.G[v][i])
            res = self.merge(res, self.f(self.dp[v][i], self.G[v][i]))
        return self.g(res, v)
    
    def dfs2(self, p, v, from_par):
        for i in range(len(self.G[v])):
            if self.G[v][i] == p:
                self.dp[v][i] = from_par
                break
        pR = [self.mi] * (len(self.G[v]) + 1)
        pR[len(self.G[v])] = self.mi
        for i in range(len(self.G[v]), 0, -1):
            pR[i - 1] = self.merge(pR[i], self.f(self.dp[v][i - 1], self.G[v][i - 1]))
        pL = self.mi
        for i in range(len(self.G[v])):
            if self.G[v][i] != p:
                val = self.merge(pL, pR[i + 1])
                self.dfs2(v, self.G[v][i], self.g(val, v))
            pL = self.merge(pL, self.f(self.dp[v][i], self.G[v][i]))
    
    def calc(self, root = 0):
        for i in range(self.V):
            self.dp[i] = [None] * len(self.G[i])
        self.dfs1(-1, root)
        self.dfs2(-1, root, self.mi)

    def solve(self, v) -> T:
        res = self.mi
        for i in range(len(self.G[v])):
            res = self.merge(res, self.f(self.dp[v][i], self.G[v][i]))
        return self.g(res, v)
```
## 最小高度树
```python
class Solution:
    def findMinHeightTrees(self, n: int, edges: List[List[int]]) -> List[int]:
        """
        dp[u]: 第 u 个节点的最小高度数高度
        dp[u]: min(dp[v] + 1)
        """
        def f(child: int, u: int) -> int:
            return child + 1

        def merge(A: int, B: int) -> int:
            return max(A, B)

        def g(A: int, B: int) -> int:
            return A
        
        re = ReRooting(n, f, merge, 1, g)
        for l, r in edges: re.add_edge(l, r)
        re.calc()

        mi = min(re.solve(i) for i in range(n))
        return [i for i in range(n) if re.solve(i) == mi]
```

## 相关题目
- [310. 最小高度树](https://leetcode.cn/problems/minimum-height-trees/)
- [834. 树中距离之和](https://leetcode.cn/problems/sum-of-distances-in-tree/)
- [2538. 最大价值和与最小价值和的差值](https://leetcode.cn/problems/difference-between-maximum-and-minimum-price-sum/)
- [2581. 统计可能的树根数目](https://leetcode.cn/problems/count-number-of-possible-root-nodes/)