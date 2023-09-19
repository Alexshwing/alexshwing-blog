# 储藏
将当前分支未提交的修改暂时存储

## 查看存储记录
- 查看存储记录列表
```shell
git stash list
```

> 如果存储时没有添加备注, 存储记录的格式为`stash@{索引值}：WIP on [分支名]: [最近一次 commitId + 提交信息]`
>
> 如果存储时有添加备注, 存储记录的格式为`stash@{索引值}: on[分支名]: [标识内容]`

- 查看最近一次存储记录的具体修改内容
```shell
git stash show
```
- 查看指定索引存储记录的具体修改内容
```shell
git stash show index
```

## 存储修改
- 直接存储修改
```shell
git stash
```
- 存储修改并添加备注
```shell
git stash -m "xx"
```

## 恢复存储记录
- 恢复最近一次的存储记录
```shell
git stash apply
```
- 恢复指定索引的存储记录
```shell
git stash apply index
```

## 删除存储记录
- 删除最近一次的存储记录
```shell
git stash drop
```
- 删除指定索引的存储记录
```shell
git stash drop index
```
- 删除所有暂存修改
```shell
git stash clear
```

## 恢复并删除存储记录
- 恢复并删除最近一次的存储记录
```shell
git stash pop
```
- 恢复并删除指定索引的存储记录
```shell
git stash pop index
```