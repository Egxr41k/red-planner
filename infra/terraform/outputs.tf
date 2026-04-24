# Вывод публичного IP веб-сервера
output "web_public_ip" {
  value       = aws_instance.web.public_ip
  description = "Public IP of the Web Server"
}

# Вывод публичного IP приложения
output "app_public_ip" {
  value       = aws_instance.app.public_ip
  description = "Public IP of the App Server"
}

# Те самые NS-сервера, которые нужно будет вставить в Cloudflare
output "route53_nameservers" {
  value       = aws_route53_zone.main.name_servers
  description = "Nameservers for Route53 zone (Add these to Cloudflare)"
}
