# --- Security Groups ---

# 1. Группа безопасности для Web Server (Весь мир: 80, 443 + SSH)
resource "aws_security_group" "web_sg" {
  name        = "web_server_sg"
  description = "Allow HTTP, HTTPS and SSH"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# 2. Группа безопасности для App (Только с Web Server на 8080)
resource "aws_security_group" "app_sg" {
  name        = "app_server_sg"

  ingress {
    from_port       = 8080
    to_port         = 8080
    protocol        = "tcp"
    security_groups = [aws_security_group.web_sg.id]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# --- Instances ---

resource "aws_instance" "web" {
  ami                    = var.ami_id
  instance_type          = "t3.micro"
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.web_sg.id]

  tags = { Name = "web_server" }
}

resource "aws_instance" "app" {
  ami                    = var.ami_id
  instance_type          = "t3.micro"
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  tags = { Name = "app" }
}

# --- DNS (Route53) ---

resource "aws_route53_zone" "main" {
  name = "aws.${var.domain_name}" # Будет aws.ihavebig.pp.ua
}

resource "aws_route53_record" "web_record" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "web"
  type    = "A"
  ttl     = "300"
  records = [aws_instance.web.public_ip]
}

resource "aws_route53_record" "app_record" {
  zone_id = aws_route53_zone.main.zone_id
  name    = "app"
  type    = "A"
  ttl     = "300"
  records = [aws_instance.app.public_ip]
}

resource "aws_key_pair" "deployer" {
  key_name   = "aws-key"
  public_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCl55nQMgZwCzdtJTq/YerQ9YqNdSPcqQspfwWnXcsmNBm3/NPPzWpbann6Ip5PzjWNbHeZsnde38OXQLMnxUQtN1GYy7/ok4/FPoWZJ1gqA+VBlXTU+2DdIGXpcMNEdR6Y8B6/axJv2ArJlD/Dyer1vcBlVK0QK+iT+CRuOI7u78MrRenUS7KNbLh4EbVPXFJ8Ylng/K75lwd84+Yh24qjD7Lo9VuczFgijjFWMdmI57RIxXYwkaAmlPQ/Tayhn7h6K6BnkdJd+fYZQde9az9UV64N+po7O0IJO0833Z0oGBRsnZXHFiI19IFbtkguffJVyqITS5HItTbbiIBTIKO9"
}
