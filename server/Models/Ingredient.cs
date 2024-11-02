using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace serverApi.Models
{
	public class Ingredient
    {
        [Key]
        public int Id { get; set; }

        [Required, MaxLength(30)]
        public string? Nome { get; set; }

        [Required]
        public DateTime DataFabricacao { get; set; }

        [Required]
        public DateTime DataValidade { get; set; }

        [Required]
        public short Quantidade { get; set; }

        [MaxLength(100)]
        public string Observacao { get; set; } = string.Empty;

        // Navigation property for usos
        // public ICollection<Usos>? Usos { get; set; }
    }
}
