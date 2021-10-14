# 使用Mix.release代替distillery

Elixir在1.9中推出了mix.release功能，来发布OTP版本

由于是语言本身提供的功能，在phoenix中提供了runtime config配置来处理对应参数，相对于distillery开发方便了很多。

简单实用方法：

初始化release
```bash
mix release.init
```

会生成并创建
```
rel/
  env.bat.eex
  env.sh.eex
  remote.vm.args.eex
  vm.args.eex
```

在`mix.exs`中添加
```elixir
def project do
    [
      # ...
      releases: [
        gsmlg_umbrella: [
          applications: [
            gsmlg: :permanent,
            gsmlg_web: :permanent
          ]
        ],
        gsmlg_web_only: [
          applications: [gsmlg_web: :permanent]
        ],
        gsmlg_only: [
          applications: [gsmlg: :permanent]
        ]
      ]
      # ...
    ]
  end
```

发布版本
```bash
MIX_ENV=prod mix release <<release name>>
```

### 相对与`distillery`的不同

相对于`distillery`配置来说大大的简化了对应的配置

缺点是： **不再支持erlang VM最强大的特性，热更新**
