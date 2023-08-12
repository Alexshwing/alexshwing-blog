# 拓扑排序
```python
# 210.课程表 II
class Solution:
    def findOrder(self, n: int, A: List[List[int]]) -> List[int]:
        g, in_deg = [[] for _ in range(n)], [0] * n
        for x, y in A:
            g[y].append(x)
            in_deg[x] += 1
        q = deque(i for i, d in enumerate(in_deg) if not d)
        res = []
        while q:
            x = q.popleft()
            res.append(x)
            for y in g[x]:
                in_deg[y] -= 1
                if not in_deg[y]:
                    q.append(y)
        return res if len(res) == n else []
```