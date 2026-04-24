# AWS Infrastructure for Senior CI/CD Project

Цей репозиторій містить Terraform-конфігурацію для розгортання базової інфраструктури вебсервісу в регіоні **eu-north-1** (Стокгольм). Проєкт є частиною навчання системному адмініструванню та DevOps.

## 🏗 Архітектура

Інфраструктура включає наступні компоненти:
* **Web Server**: Публічний інстанс (t3.micro) на базі Debian, що приймає трафік через порти 80 та 443.
* **App Server**: Ізольований інстанс (t3.micro), доступ до якого через порт 8080 дозволений тільки з групи безпеки Web Server.
* **DNS**: Автоматичне управління піддоменами через AWS Route53 з делегуванням з основного домену в Cloudflare.

## 📂 Структура файлів

* `main.tf` — опис основних ресурсів: інстансів, груп безпеки та DNS-зон.
* `providers.tf` — конфігурація провайдерів AWS та Cloudflare.
* `outputs.tf` — вивід критичних даних (IP-адреси, NS-сервери) після розгортання.
* `variables.tf` — визначення змінних для домену, AMI та типів інстансів.
* `.gitignore` — захист від коміту секретів (`.tfstate`, `.tfvars`).

## 🚀 Швидкий старт

### 1. Підготовка секретів
Створіть файл `terraform.tfvars` (він уже доданий до `.gitignore`) та заповніть його своїми актуальними даними:

```hcl
access_key      = "YOUR_NEW_AWS_ACCESS_KEY"
secret_key      = "YOUR_NEW_AWS_SECRET_KEY"
cloudflare_token = "YOUR_NEW_CLOUDFLARE_TOKEN"
key_name         = "aws-key"
domain_name      = "ihavebig.pp.ua"
