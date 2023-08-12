# 代码行数统计
```shell
git log --author="username" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }' -
```
- `git log --author="username"`这部分用于根据作者筛选提交历史。将 username 替换为你要查找的特定作者的用户名。

- `--pretty=tformat:`这个选项指定输出格式为空，即只输出代码行数相关的信息，不包含其他额外的信息。

- `--numstat`这个选项输出统计信息，包括每个提交的新增、删除和修改的代码行数。

- `|`这是管道操作符，用于将前一个命令的输出传递到后一个命令。

- `awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "added lines: %s, removed lines: %s, total lines: %s\n", add, subs, loc }'`这部分使用 awk 命令对 numstat 的输出进行处理和计算。它会累加新增的行数、删除的行数，并计算总共的行数变化（新增减去删除）。最后，使用 printf 格式化输出结果，显示新增的行数、删除的行数和总行数的变化情况。