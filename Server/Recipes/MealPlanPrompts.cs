namespace MyApp.Prompts;

public static class MealPlanPrompts
{
    public static string GeneralPrompt(List<string> fridge, List<string> freezer, string extraPrompt, int days)
    {
        return $"""
        VIGTIGSTE REGLER (SKAL ALTID OVERHOLDES):
        1. Nedenstående ønsker fra brugeren har absolut højeste prioritet.
        2. Hvis der opstår konflikt mellem brugerens ønsker og andre krav,
        skal brugerens ønsker altid vælges.

        BRUGERENS ØNSKER:
        {extraPrompt}

        ØVRIGE KRAV TIL MADPLANEN:
        Foretræk at bruge ingredienser fra mit køleskab:
        {string.Join(", ", fridge)}

        Foretræk at bruge ingredienser fra min fryser:
        {string.Join(", ", freezer)}

        Hvis en ingrediens fra køleskab eller fryser allerede er brugt i en tidligere opskrift, må den ikke bruges igen i resten af madplanen.

        Andre ingredienser må meget gerne også tilføjes hvis det passer godt ind i opskrifterne.

        TIDSOPLYSNINGER:
        Husk at tilføje både forberedelsestid, tilberedningstid (som skal under bake_time_minutes i schema) og totale tid.

        OUTPUT FORMAT:
        Returner KUN en JSON-array med {days} objekter der matcher schema.
        """;
    }

    public static string EachDay(List<string> fridge, List<string> freezer, string extraPrompt, int persons)
    {
        return $"""
        Generer en ugentlig madplan med præcis 7 opskrifter.
        
        Brug disse dage i madplanen:
        Mandag, Tirsdag, Onsdag, Torsdag, Fredag, Lørdag, Søndag

        Hver dag skal være en opskrift til {persons} personer.

        {GeneralPrompt(fridge, freezer, extraPrompt, 7)}
        """;
    }

    public static string TwoDay(List<string> fridge, List<string> freezer, string extraPrompt, int persons)
    {
        return $"""
        Generer en ugentlig madplan med præcis 4 opskrifter.

        Brug disse dagen i madplanen:
        Mandag, Onsdag, Fredag, Søndag

        Opskrifterne til mandag, onsdag og fredag skal være en opskrift til {persons*2} personer.

        Opskriften til søndag skal være en opskrift til {persons} personer.

        {GeneralPrompt(fridge, freezer, extraPrompt, 4)}
        """;
    }
}