variable "domain_name" {
  type    = string
}

variable "cloudflare_zone_id" {
  type    = string
}

variable "key_name" {
  type    = string
  description = "Имя твоего SSH ключа в консоли AWS"
}

variable "ami_id" {
  type    = string
  default = "ami-05edb7c94b324f73c"
}
