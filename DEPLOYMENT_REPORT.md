# ZenFlow AWS EC2 部署报告

## 部署结果

部署成功。

- 公网访问地址：http://3.234.223.175
- EC2 Instance ID：`i-0003bfa567ca4f622`
- Region：`us-east-1`
- 实例规格：`t3.micro`
- 系统：Ubuntu Server 24.04
- Web Server：Nginx 1.24.0
- 部署目录：`/var/www/zenflow`

## 已创建资源

| 资源 | 名称 / ID | 说明 |
| --- | --- | --- |
| EC2 Instance | `i-0003bfa567ca4f622` | ZenFlow Web 服务器 |
| Security Group | `sg-0384e73d223bc55a7` / `zenflow-web-sg` | 仅开放 HTTP 80 |
| IAM Role | `zenflow-ec2-ssm-role` | 允许实例通过 SSM 管理 |
| Instance Profile | `zenflow-ec2-ssm-profile` | 绑定到 EC2 |
| S3 Bucket | `zenflow-deploy-901864715497-20260607` | 部署包临时中转 |

## 安全配置

- SSH 22 未开放。
- HTTP 80 对公网开放。
- EC2 使用 SSM 管理，无需 SSH Key。
- SSM 权限策略：`AmazonSSMManagedInstanceCore`。
- S3 部署对象通过短期预签名 URL 下载。

## 验证记录

### EC2 状态

- Instance State：`running`
- Public IP：`3.234.223.175`
- SSM PingStatus：`Online`

### Nginx 验证

实例内部验证：

```text
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
```

公网验证：

```text
curl -I http://3.234.223.175
HTTP/1.1 200 OK
Server: nginx/1.24.0 (Ubuntu)
```

## 部署流程摘要

1. 通过 AWS MCP 验证身份。
2. 查询默认 VPC、默认子网、Ubuntu AMI 和 Free Tier eligible 实例规格。
3. 创建 SSM IAM Role 和 Instance Profile。
4. 创建安全组 `zenflow-web-sg`，开放 80。
5. 创建 EC2 实例 `zenflow-web`。
6. 通过 SSM 安装 Nginx。
7. 本地构建 Vite 项目。
8. 将 `dist` 打包上传至 S3。
9. 通过 SSM 在 EC2 下载部署包并解压到 `/var/www/zenflow`。
10. 重启 Nginx 并验证公网访问。

## 后续建议

- 配置域名和 HTTPS。
- 部署完成后清理临时 S3 bucket，减少长期暴露与微量存储费用。
- 后续部署可以复用 SSM，无需开放 SSH。
- 如果长期运行 EC2，请持续关注 AWS Budget 告警。
