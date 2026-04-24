terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "eu-north-1" # Стокгольм, как на твоем скрине
}

provider "cloudflare" {
  # API Token берется из переменной CLOUDFLARE_API_TOKEN
}
