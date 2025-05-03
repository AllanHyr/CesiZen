<template>
  <q-page class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col-12 text-h4">Bienvenue sur CesiZen</div>
    </div>

    <div class="row q-mb-md">
      <div class="col-md-4 col-sm-12 q-pr-md">
        <q-img
          src="https://via.placeholder.com/300"
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

    <div class="row q-gutter-md">
      <div class="col-md-6 col-sm-12">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">Diagnostics</div>
          </q-card-section>
          <q-card-section>
            <p>
              Explorez nos outils de diagnostic pour mieux comprendre votre niveau de stress et
              votre bien-être général. Vous pouvez répondre à des questionnaires et suivre votre
              évolution.
            </p>
            <ul>
              <li>Afficher et dérouler le questionnaire diagnostic de stress</li>
              <li>
                Configurer le questionnaire diagnostic de stress : événements / points associés
                (Administrateur)
              </li>
              <li>Configurer la page de résultat du diagnostic de stress (Administrateur)</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-6 col-sm-12">
        <q-card>
          <q-card-section class="bg-secondary text-white">
            <div class="text-h6">Exercices de respiration</div>
          </q-card-section>
          <q-card-section>
            <p>
              Découvrez des exercices de respiration pour favoriser la détente et réduire le stress.
              Accédez à des séances guidées pour vous aider à retrouver calme et sérénité.
            </p>
            <ul>
              <li>Configurer l'exercice de cohérence cardiaque (Administrateur)</li>
              <li>Lancer l'exercice de cohérence cardiaque</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-6 col-sm-12">
        <q-card>
          <q-card-section class="bg-info text-white">
            <div class="text-h6">Activités de détente</div>
          </q-card-section>
          <q-card-section>
            <p>
              Parcourez notre catalogue d'activités conçues pour vous aider à vous détendre et à
              vous ressourcer. Trouvez des activités qui correspondent à vos préférences et à vos
              besoins.
            </p>
            <ul>
              <li>Consulter et filtrer le catalogue d'activités détente</li>
              <li>Consulter une activité détente</li>
              <li>Marquer une activité comme favorite</li>
              <li>Ajouter / Modifier une activité détente (Administrateur)</li>
              <li>Désactiver une activité détente (Administrateur)</li>
            </ul>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-md-6 col-sm-12">
        <q-card>
          <q-card-section class="bg-positive text-white">
            <div class="text-h6">Tracker d'émotions</div>
          </q-card-section>
          <q-card-section>
            <p>
              Suivez et analysez vos émotions au quotidien grâce à notre outil de suivi. Identifiez
              les tendances et comprenez mieux votre état émotionnel.
            </p>
            <ul>
              <li>Afficher le journal de bord de son tracker d'émotions</li>
              <li>Ajouter / Modifier un tracker (item) du journal de bord</li>
              <li>Supprimer un tracker (item) du journal de bord</li>
              <li>
                Visualiser un rapport d'émotion sur une période donnée (semaine, mois, trimestre,
                année)
              </li>
              <li>
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
