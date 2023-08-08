# commit 规范

```shell
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```
1. type
- build: 变更项目构建或外部依赖(示例范围: gulp, broccoli, npm )
- ci: 修改持续集成软件的配置文件和 package 中的 script 命令(示例范围: Travis, Circle, BrowserStack, SauceLabs )
- docs: 仅文档更改
- feat: 新功能
- fix: 修复 bug
- perf: 性能优化
- refactor: 重构(即不是新增功能，也不是修复 bug )
- style: 代码格式改动(空格、格式化、缺少分号等)
- test: 增加缺少的测试或更正已有的测试
- revert: 代码回退
- chore: 变更构建流程或辅助工具
2. scope: 提交影响范围
3. subject: 对提交简洁描述
4. body: 对提交具体描述
5. footer: 不兼容改动和关闭 issue

- [Augular 规范](https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines)