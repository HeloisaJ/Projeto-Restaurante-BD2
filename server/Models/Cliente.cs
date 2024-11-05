using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace server.Models
{
    public class Cliente
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(60)]
        public string? Nome { get; set; }

        [Required]
        public char Sexo { get; set; }

        [Required]
        public int Idade { get; set; }

        [Required]
        public DateTime Nascimento { get; set; }

        [Required]
        public int Pontos { get; set; }

        // Navigation property for sales
        public ICollection<Venda>? Vendas { get; set; }
    }
}
