using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pizzaria.Models
{
		public class Prato
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(40)]
        public string? Nome { get; set; }

        [Required]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public decimal Valor { get; set; }

        [Required]
        public bool Disponibilidade { get; set; }

        // Navigation properties for vendas and usos
        public ICollection<Venda>? Vendas { get; set; }
        public ICollection<Usos>? Usos { get; set; }
    }
}
