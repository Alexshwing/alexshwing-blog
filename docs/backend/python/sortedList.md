# sortedList

SortedList 按照升序维护列表, 与 Python 的内置列表一样, SortedList 支持重复元素和快速随机访问索引
## init
```python
>>> from sortedcontainers import SortedList
>>> sl = SortedList()
>>> sl2 = SortedList(key=lambda x: -x)
```
## add

添加元素

  复杂度 `O(log n)`
```python
>>> sl = SortedList()
>>> sl.add(3)
>>> sl.add(1)
>>> sl.add(2)
>>> sl
SortedList([1, 2, 3])
```

## update
将一组新的可迭代对象添加到 SortedList 中

复杂度 `O(k * log n)`
```python
>>> sl = SortedList()
>>> sl.update([3, 1, 2])
>>> sl
SortedList([1, 2, 3])
```

## clear
清空 SortedList 所有值

复杂度 `O(n)`

## discard
将 value 从 SortedList 移除

如果 SortedList 没有该值, 不进行任何操作

复杂度为`O(log n)`
```python
>>> sl = SortedList([1, 2, 3, 4, 5])
>>> sl.discard(5)
>>> sl.discard(0)
>>> sl == [1, 2, 3, 4]
True
```

## remove
将 value 从 SortedList 移除

如果 SoretedList 没有该值, 抛出 `ValueError`错误

复杂度为 `O(log n)`
```python
>>> sl = SortedList([1, 2, 3, 4, 5])
>>> sl.remove(5)
>>> sl == [1, 2, 3, 4]
True
>>> sl.remove(0)
Traceback (most recent call last):
  ...
ValueError: 0 not in list
```

## pop
移除并返回 index 位置的值

如果 SoretedList 为空 或者 index 超过范围, 抛出 `IndexError`错误

复杂度 `O(log n)`
```python
>>> sl = SortedList('abcde')
>>> sl.pop()
'e'
>>> sl.pop(2)
'c'
>>> sl
SortedList(['a', 'b', 'd'])
```

## bisect_left
返回该值在 SortedList 插入的索引

如果该值存在, 则插入点将位于任何现有值左侧(大于等于 val 的第一个下标)

复杂度 `O(log n)`

```python
>>> sl = SortedList([10, 11, 12, 13, 14])
>>> sl.bisect_left(12)
2
```

## bisect_right
返回该值在 SortedList 插入的索引

如果该值存在, 则插入点将位于任何现有值右侧(大于 val 的第一个下标)

复杂度 `O(log n)`

```python
>>> sl = SortedList([10, 11, 12, 13, 14])
>>> sl.bisect_right(12)
3
```

## count

该值在 SortedList 出现次数

复杂度 `O(log n)`
```python
>>> sl = SortedList([1, 2, 2, 3, 3, 3, 4, 4, 4, 4])
>>> sl.count(3)
3
```
## index
`index(value, start=None, stop=None)`

返回该值第一次出现的位置

如果不存在, 抛出`ValueError`错误

复杂度 `O(log n)`
```python
>>> sl = SortedList('abcde')
>>> sl.index('d')
3
>>> sl.index('z')
Traceback (most recent call last):
  ...
ValueError: 'z' is not in list
```
:::tip 来源
[Sorted List — Sorted Containers 2.4.0 documentation](https://grantjenks.com/docs/sortedcontainers/sortedlist.html)
:::
