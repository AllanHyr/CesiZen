<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col-12 text-h4 text-center">Bienvenue sur CesiZen</div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-4 col-sm-12 q-pr-md">
        <q-img
          src="../assets/logo_cesizen.png"
          spinner-color="primary"
          style="max-width: 300px; width: 100%"
        />
      </div>
      <div class="col-md-8 col-sm-12">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
          sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
          est laborum.
        </p>
        <p>
          Notre plateforme CesiZen est conçue pour vous accompagner dans votre parcours de bien-être
          et de gestion de la santé mentale. Découvrez nos différents modules conçus pour répondre à
          vos besoins.
        </p>
      </div>
    </div>

    <div class="row q-gutter-md justify-center">
      <div class="col-sm-12 col-md-5">
        <q-card class="shadow-2">
          <q-card-section class="bg-primary text-white row items-center">
            <q-icon name="psychology" size="md" class="q-mr-sm" />
            <div class="text-h6">Diagnostics</div>
          </q-card-section>
          <q-card-section>
            <p>
              Explorez nos outils de diagnostic pour mieux comprendre votre niveau de stress et
              votre bien-être général. Vous pouvez répondre à des questionnaires et suivre votre
              évolution.
            </p>
            <ul>
              <li class="q-mb-xs">Afficher et dérouler le questionnaire diagnostic de stress</li>
              <li class="q-mb-xs">
                Configurer le questionnaire diagnostic de stress : événements / points associés
                (Administrateur)
              </li>
              <li class="q-mb-xs">
                Configurer la page de résultat du diagnostic de stress (Administrateur)
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-sm-12 col-md-5">
        <q-card class="shadow-2">
          <q-card-section class="bg-secondary text-white row items-center">
            <q-icon name="spa" size="md" class="q-mr-sm" />
            <div class="text-h6">Exercices de respiration</div>
          </q-card-section>
          <q-card-section>
            <p>
              Découvrez des exercices de respiration pour favoriser la détente et réduire le stress.
              Accédez à des séances guidées pour vous aider à retrouver calme et sérénité.
            </p>
            <ul>
              <li class="q-mb-xs">Configurer l'exercice de cohérence cardiaque (Administrateur)</li>
              <li class="q-mb-xs">Lancer l'exercice de cohérence cardiaque</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-sm-12 col-md-5">
        <q-card class="shadow-2">
          <q-card-section class="bg-info text-white row items-center">
            <q-icon name="self_improvement" size="md" class="q-mr-sm" />
            <div class="text-h6">Activités de détente</div>
          </q-card-section>
          <q-card-section>
            <p>
              Parcourez notre catalogue d'activités conçues pour vous aider à vous détendre et à
              vous ressourcer. Trouvez des activités qui correspondent à vos préférences et à vos
              besoins.
            </p>
            <ul>
              <li class="q-mb-xs">Consulter et filtrer le catalogue d'activités détente</li>
              <li class="q-mb-xs">Consulter une activité détente</li>
              <li class="q-mb-xs">Marquer une activité comme favorite</li>
              <li class="q-mb-xs">Ajouter / Modifier une activité détente (Administrateur)</li>
              <li class="q-mb-xs">Désactiver une activité détente (Administrateur)</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-sm-12 col-md-5">
        <q-card class="shadow-2">
          <q-card-section class="bg-positive text-white row items-center">
            <q-icon name="favorite" size="md" class="q-mr-sm" />
            <div class="text-h6">Tracker d'émotions</div>
          </q-card-section>
          <q-card-section>
            <p>
              Suivez et analysez vos émotions au quotidien grâce à notre outil de suivi. Identifiez
              les tendances et comprenez mieux votre état émotionnel.
            </p>
            <ul>
              <li class="q-mb-xs">Afficher le journal de bord de son tracker d'émotions</li>
              <li class="q-mb-xs">Ajouter / Modifier un tracker (item) du journal de bord</li>
              <li class="q-mb-xs">Supprimer un tracker (item) du journal de bord</li>
              <li class="q-mb-xs">
                Visualiser un rapport d'émotion sur une période donnée (semaine, mois, trimestre,
                année)
              </li>
              <li class="q-mb-xs">
                Configurer la liste d'émotions disponibles : émotion de base (niveau 1) - émotion
                niveau 2 (Administrateur)
              </li>
            </ul>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup></script>
