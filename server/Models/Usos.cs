using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Pizzaria.Models
{
	public class Usos
    {
        [Key]
        public int IdPrato { get; set; }

        [ForeignKey("IdPrato")]
        public Prato? Prato { get; set; }

        [Key]
        public int IdIngrediente { get; set; }

        // [ForeignKey("IdIngrediente")]
        // public Ingredientes Ingrediente { get; set; }
    }
}
